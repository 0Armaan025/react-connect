import React from 'react';
import BlogList from '../../components/bloglist/BlogList';
import './blogs1.css';
import NavBar from '../../components/navbar/navbar1';
import { Link } from 'react-router-dom';
 
const Blogs = () => {
  return (
    <>
    <div>
        <NavBar/>
        <div className="blog_container">
            <div className="blog_title">
                Blogs
            </div>
            <div className="blog_card">
                <div className="blog_card_img">
 
                <img className='blog_img' src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="" />
 
                </div>
 
            <div className="card_content">
                <div className="blog_author">
                    I am the Author
                </div>
                <h2 className="blog_card_title">This is my blog</h2>
                <p className='blog_desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius commodi blanditiis mollitia, deleniti nihil ut corporis, ab qui adipisci eligendi nesciunt rerum reiciendis alias iste perspiciatis, quos natus? Harum, similique.</p>
            </div>
            </div>
        </div>
        <BlogList/>
        <Link to="/add-blog"><button className="add-blog-button">Add a blog 📝</button></Link>
    </div>
    </>
  )
}
 
export default Blogs