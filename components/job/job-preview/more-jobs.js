import JobPreview from './job-preview'
import styled from 'styled-components';
import media from 'styled-media-query';

const ListWrapper = styled.div`
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
  padding-right: var(--space);
  padding-left: var(--space);
  ${media.greaterThan('small')`
        display: grid;
        grid-gap: 20px;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    `}
  ${media.greaterThan('medium')`
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    `}
`;


export default function MoreJobs({ jobs }) {
  
  return (
    <section>
      <ListWrapper>
        {jobs.map((job) => (
          <JobPreview
            key={job.slug}
            title={job.title}
            company={job.company}
            location={job.location}
            company={job.company}
            workingTime={job.workingTime}
            date={job.date}
            contractType={job.contractType}
            slug={job.slug}
          />
        ))}
      </ListWrapper>
    </section>
  )
}
