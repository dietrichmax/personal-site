import Date from '../../date/date'
import Link from 'next/link'
import styled from 'styled-components';
import media from 'styled-media-query';
import JobUser from '@/components/job/job-company/job-company'

const Card = styled.div`
  margin-bottom: var(--space);
  border: 1px solid var(--gray-light);
  border-radius: 0.75rem;
  background-color: #fff;
`

const JobItemWrapper = styled.div`
  padding: var(--space-sm) var(--space);
`


const JobItemTitle = styled.h2`
  color: var(--gray);
  line-height: 1.35;
  margin-bottom: calc(var(--space-sm) *0.5);
  :hover {
    color: var(--primary-color);
  }
`;

const CardItemDate = styled.p`
  font-size: 1.4rem;
  margin-bottom: calc(var(--space-sm) *0.5);
`;



export default function JobPreview({
  title,
  location,
  slug,
  date,
  user,
  workingTime,
  contractType
}) {
  return (
    <div>
      <Card>
        <JobItemWrapper>
          <JobItemTitle>
            <Link as={`/jobs/${slug}`} href="/jobs/[slug]">
              <a title={title}>{title}</a>
          </Link>
          </JobItemTitle>
          <JobUser username={user.username} email={user.email} picture={user.picture.url}/>
          <p>{location} • {workingTime} • {contractType}</p>
          <CardItemDate>
           <Date dateString={date} ago />
          </CardItemDate>
        </JobItemWrapper>
      </Card>
    </div>
  )
}
