import { parseISO, format } from 'date-fns'
import config from "../../data/SiteConfig";

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, config.dateFormat)}</time>
}
