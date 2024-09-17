import React from 'react';
import CommentForm from './CommentForm'; 

const CommentsList = ({ comments, campsiteId }) => {
    return (
        <div>
            {comments.map(comment => (
                <div key={comment.id}>
                    <p>{comment.text}</p>
                    <p>-- {comment.author}</p>
                </div>
            ))}

            <CommentForm campsiteId={campsiteId} />
        </div>
    );
};

export default CommentsList;
