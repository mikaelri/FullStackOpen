const Blog = ({ blogs }) => {
  
  return (
    <div>
      <div>
        {blogs.map(blog =>
        <div key={blog.id}> 
          <div>
            { blog.title } { blog.author }
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Blog