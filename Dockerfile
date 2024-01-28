FROM node:21-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json ./
RUN npm install
  
RUN npm install sharp 

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1


# genenv
RUN --mount=type=secret,id=NEXT_PUBLIC_STRAPI_API_URL \
  --mount=type=secret,id=NEXT_PUBLIC_MATOMO_URL \
  --mount=type=secret,id=NEXT_PUBLIC_MATOMO_SITE_ID \
  --mount=type=secret,id=NEXT_PUBLIC_MATOMO_API_KEY \
  --mount=type=secret,id=NEXT_PUBLIC_WEBMENTION_KEY \
  --mount=type=secret,id=NEXT_PUBLIC_IMGPROXY_URL \
  --mount=type=secret,id=NEXT_PUBLIC_IMGPROXY_KEY \
  --mount=type=secret,id=NEXT_PUBLIC_IMGPROXY_SALT \
  --mount=type=secret,id=NEXT_PUBLIC_MAPPROXY_URL \
  --mount=type=secret,id=DASHBOARD_GITHUB_PAK \
  --mount=type=secret,id=OPENWEATHER_API_KEY \
  --mount=type=secret,id=DATABASE_URL \
  export NEXT_PUBLIC_STRAPI_API_URL=$(cat /run/secrets/NEXT_PUBLIC_STRAPI_API_URL) && \
  export NEXT_PUBLIC_MATOMO_URL=$(cat /run/secrets/NEXT_PUBLIC_MATOMO_URL) && \
  export NEXT_PUBLIC_MATOMO_SITE_ID=$(cat /run/secrets/NEXT_PUBLIC_MATOMO_SITE_ID) && \
  export NEXT_PUBLIC_MATOMO_API_KEY=$(cat /run/secrets/NEXT_PUBLIC_MATOMO_API_KEY) && \
  export NEXT_PUBLIC_WEBMENTION_KEY=$(cat /run/secrets/NEXT_PUBLIC_WEBMENTION_KEY) && \
  export NEXT_PUBLIC_IMGPROXY_URL=$(cat /run/secrets/NEXT_PUBLIC_IMGPROXY_URL) && \
  export NEXT_PUBLIC_IMGPROXY_KEY=$(cat /run/secrets/NEXT_PUBLIC_IMGPROXY_KEY) && \
  export NEXT_PUBLIC_IMGPROXY_SALT=$(cat /run/secrets/NEXT_PUBLIC_IMGPROXY_SALT) && \
  export NEXT_PUBLIC_MAPPROXY_URL=$(cat /run/secrets/NEXT_PUBLIC_MAPPROXY_URL) && \
  export DASHBOARD_GITHUB_PAK=$(cat /run/secrets/DASHBOARD_GITHUB_PAK) && \
  export OPENWEATHER_API_KEY=$(cat /run/secrets/OPENWEATHER_API_KEY) && \
  export DATABASE_URL=$(cat /run/secrets/DATABASE_URL) && \
  npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next
RUN chown nextjs:nodejs public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
