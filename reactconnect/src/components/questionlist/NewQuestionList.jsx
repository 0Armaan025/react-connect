import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './questionlist.css';
import NavBar from '../navbar/Navbar';

const NewQuestionsList = () => {
  const [issues, setIssues] = useState([]);
  const [commentText, setCommentText] = useState('');

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async (event, issueNumber) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `https://api.github.com/repos/0Armaan025/tiktok_clone/issues/${issueNumber}/comments`,
        {
          body: commentText,
        },
        {
          headers: {
            Authorization: `token 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`,
          },
        }
      );

      // Refresh the issue's comments after successful submission
      const updatedIssues = [...issues];
      const issueToUpdate = updatedIssues.find((issue) => issue.number === issueNumber);
      if (issueToUpdate) {
        issueToUpdate.comments.push(response.data);
        setIssues(updatedIssues);
      }

      // Clear the comment input field
      setCommentText('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(
          'https://api.github.com/repos/0Armaan025/tiktok_clone/issues',
          {
            headers: {
              Authorization: `token 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`,
            },
          }
        );

        const issuesWithComments = await Promise.all(
          response.data.map(async (issue) => {
            const commentsResponse = await axios.get(
              issue.comments_url,
              {
                headers: {
                  Authorization: `token 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`,
                },
              }
            );
            return {
              ...issue,
              comments: commentsResponse.data,
              showComments: false,
            };
          })
        );

        setIssues(issuesWithComments);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []);

  const toggleComments = (issueId) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === issueId ? { ...issue, showComments: !issue.showComments } : issue
      )
    );
  };

  const handleCommentDelete = async (issueNumber, commentId) => {
    try {
      await axios.delete(
        `https://api.github.com/repos/0Armaan025/tiktok_clone/issues/comments/${commentId}`,
        {
          headers: {
            Authorization: `token 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`,
          },
        }
      );

      // Refresh the issue's comments after successful deletion
      const updatedIssues = issues.map((issue) => {
        if (issue.number === issueNumber) {
          return {
            ...issue,
            comments: issue.comments.filter((comment) => comment.id !== commentId),
          };
        }
        return issue;
      });

      setIssues(updatedIssues);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <>
    <NavBar/>
    <div className="github-issues-list">
        
        <br/>
      <h1 className='githubIssuesHeading'>GitHub Issues</h1>
      {issues.map((issue) => (
        <div key={issue.id} className="issue">
          <h2 onClick={() => toggleComments(issue.id)} className="issue-title">
            {issue.title} <span>{issue.showComments ? '▲' : '▼'}</span>
          </h2>
          {issue.showComments && (
            <ul className="comments-list">
              {issue.comments.map((comment) => (
                <li key={comment.id} className="comment">
                  <span>{comment.body}</span>
                  {comment.user.login === '0Armaan025' && (
                    <button
                      onClick={() => handleCommentDelete(issue.number, comment.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={(event) => handleCommentSubmit(event, issue.number)} className="comment-form">
            <input
              type="text"
              value={commentText}
              onChange={handleCommentChange}
              placeholder="Write your comment..."
            />
            <button type="submit">Submit Comment</button>
          </form>
        </div>
      ))}
    </div>
    </>
  );
};

export default NewQuestionsList;
