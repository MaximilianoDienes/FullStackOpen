import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div className="blogpost">
      <p className="visible-div">
        <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
      </p>
    </div>
  )
}

export default Blog
