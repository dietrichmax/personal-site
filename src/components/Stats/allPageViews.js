/*import React from "react"
import { graphql, Link } from "gatsby"

const RecentPageViews = ({ data, count }) => {

  return (
  <div>
    <div className="row container pad-10-tb pad-3-lr">
      <div className="col-xs-12 flex margin-3-b">
        <h4 className="margin-0-b">POPULAR PAGES - LAST 30 DAYS</h4>
      </div>

      <div className="col-xs-4 col-md-6 is-grey">
        <h3 className="margin-0 margin-2-b">
          <strong>Page</strong>
        </h3>
      </div>
      <div className="col-xs-4 col-md-3 text-align-center is-grey">
        <h3 className="margin-0 margin-2-b">
          <strong>Views</strong>
        </h3>
      </div>
      <div className="col-xs-4 col-md-3 text-align-center is-grey">
        <h3 className="margin-0 margin-2-b">
          <strong>Sessions</strong>
        </h3>
      </div>

      {data.allPageViews.edges.slice(0, 5).map((item) => (
        <>
          <div className="col-xs-4 col-md-6 is-grey">
            <Link to={item.node.path} className="is-special-blue">
              <p className="margin-0">{item.node.path}</p>
            </Link>
          </div>
          <div className="col-xs-4 col-md-3 text-align-center is-grey">
            <p className="margin-0 margin-1-b">{item.node.totalCount}</p>
          </div>
          <div className="col-xs-4 col-md-3 text-align-center is-grey">
            <p className="margin-0 margin-1-b">{item.node.sessions}</p>
          </div>
        </>
      ))}
    </div>
  </div>
  )
}

export default RecentPageViews

export const query = graphql`
  {
    allPageViews {
      edges {
        node {
          totalCount
          path
          sessions
        }
      }
    }
  }
`*/