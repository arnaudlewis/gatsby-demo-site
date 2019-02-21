import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../prismic/linkResolver'
import * as GatbsyPlugin from 'gatsby-source-prismic-graphql'

const BlogPost = (props) => {
  console.log("blogpost props")
  console.log(props)
  const data = (props.data && props.data.prismic.allBlogposs.edges[0].node) || props.pageContext.data
  return (
    <div id="blogpost">
      <h1>{RichText.asText(data.title)}</h1>
      {RichText.render(data.body, linkResolver)}
    </div>
  )
}

export default withPreview(BlogPost)


// HIDDEN IN THE FUTURE
function withPreview(Component) {
  return class extends React.Component {

    constructor(props) {
      super(props)
      console.log(props)
    }

    render() {
      const EnhancedComponent = GatbsyPlugin.withPreview(Component, this.props.pageContext.previewQuery)
      return <EnhancedComponent {...this.props} />
    }
  }
}