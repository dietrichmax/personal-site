import Date from '../../date/date'
import Link from 'next/link'
import styled from 'styled-components';
import JobCompany from '@/components/job/job-company/job-company';
import config from "../../../data/SiteConfig";

const Card = styled.div`
  margin-bottom: var(--space);
  border: 1px solid ${props =>
    props.premium ? 'var(--primary-color)' : 'var(--gray-light)'};
  background-color: #fff;
  transition: 0.3s;
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

const JobMeta = styled.p`
  font-size: 1.4rem;
  color: var(--gray);
`;

const JobDate = styled.div`
  font-size: 1.3rem;
  color: var(--gray);
`;


export default function JobPreview({
  title,
  location,
  slug,
  date,
  company,
  workingTime,
  contractType,
  premium,
  applicationLink
}) {

  
  const applyLink = applicationLink.includes("@") ? `mailto:${applicationLink}?subject=Bewerbung%20als%20${title}%20via%20${config.siteTitle}` : applicationLink

  return (
    <div>
      <Card premium={premium}>
        <JobItemWrapper>
          <JobItemTitle>
            <Link href={applyLink}>
              <a title={title}>{title}</a>
          </Link>
          </JobItemTitle>
          <JobCompany companyData={company}/>
          <JobMeta>{location} • {workingTime} • {contractType}</JobMeta>
          <JobDate><Date dateString={date} ago /></JobDate>
        </JobItemWrapper>
      </Card>
    </div>
  )
}
