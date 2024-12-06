import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import cha1 from "../images/cha1.png";
import cha2 from "../images/cha2.png";
import cha3 from "../images/cha3.png";
import godMintImage from "../images/godMint.png";
import './style.css';

const ViewArt = () => {
    const location = useLocation();
    const { artId } = location.state || {};
    const [artsData, setArtsData] = useState(null);
    const [commentsData, setCommentsData] = useState(null);
    const [error, setError] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState("");
    const [newCommentText, setNewCommentText] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    const images = [ cha1, cha2, cha3 ];
    const randomImage = images[Math.floor(Math.random() * images.length)];

    const user = JSON.parse(sessionStorage.getItem("user"));
    const userID = user.userid
    const username = user.username;
    const userRole = user.role;
    const userImage = user.image;

    const fetchArts = async () => {
        try {
          const requestOptions = {
            method: "POST",
            body: JSON.stringify({ artID: artId }),
            headers: {
              "Content-Type": "application/json",
            },
          };
  
          const response = await fetch("http://localhost:3001/api/check-arts-from-artid", requestOptions);
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          setArtsData(data);
        } catch (error) {
          setError(error.message);
          console.error('There was a problem with the fetch operation:', error);
        }
    };

    const fetchComments = async () => {
        try {
          const requestOptions = {
            method: "POST",
            body: JSON.stringify({ artID: artId }),
            headers: {
              "Content-Type": "application/json",
            },
          };
  
          const response = await fetch("http://localhost:3001/api/check-comments-from-artid", requestOptions);
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          setCommentsData(data);
        } catch (error) {
          setError(error.message);
          console.error('There was a problem with the fetch operation:', error);
        }
    };

    useEffect(() => {
        fetchArts();
        fetchComments();
        console.log(commentsData)
    }, [artId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newCommentText.trim()) return;
    
        try {
            const requestOptions = {
                method: "POST",
                body: JSON.stringify({ artID: artId,userID: userID,comment: newCommentText }),
                headers: {
                    "Content-Type": "application/json",
                },
            };
    
            const response = await fetch("http://localhost:3001/api/add-comment", requestOptions);
    
            if (response.ok) {
                setNewCommentText("");
                fetchComments();
            } else {
                throw new Error("Failed to submit comment");
            }
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    const handleEditComment = async () => {
        try {
            const requestOptions = {
                method: "POST",
                body: JSON.stringify({ ID: editCommentId, comment: editCommentText }),
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch("http://localhost:3001/api/edit-comment", requestOptions);
            if (response.ok) {
                fetchComments();
                setEditCommentId(null);
                setEditCommentText("");
                setIsEditing(false);
            } else {
                throw new Error('Failed to edit comment');
            }
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    };

    const handleDeleteComment = async () => {
        try {
            const requestOptions = {
                method: "POST",
                body: JSON.stringify({ ID: commentToDelete }),
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch("http://localhost:3001/api/delete-comment", requestOptions);
            if (response.ok) {
                fetchComments();
                setShowDeleteModal(false);
            } else {
                throw new Error('Failed to delete comment');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleShowEditForm = (commentId, commentText) => {
        setEditCommentId(commentId);
        setEditCommentText(commentText);
        setIsEditing(true);
    };

    const handleShowModal = (commentID) => {
        setCommentToDelete(commentID);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setCommentToDelete(null);
    }

    const handleCancel = () => {
        setIsEditing(false);
        setEditCommentId(null);
        setEditCommentText("");
    }

    return (
        <div>
            <div className="center-container">
                {artsData ? artsData.map((art) => (
                    <div className="art-card" key={art.id}>
                        <h1 style={{fontWeight: 'bold', letterSpacing: '2px'}}>{art.title}</h1>
                        <p>By: {art.username}</p>
                        <div>
                            <img
                                src={"data:image/jpeg;base64," + art.art}
                                alt="Default Image"
                                className="img-showcase"
                            />
                        </div>
                    </div>
                )) : (
                    <div>No artwork found for the given ID.</div>
                )}
            </div>

            <div className="be-comment-block">
                <h1 className="comments-title">Comments</h1>
                {commentsData && commentsData.length>0 ? commentsData.map((comment) => (
                <div className="be-comment">
                    <div className="be-img-comment">
                        <img src={(comment.username === 'God_Mint') ? godMintImage :((comment.username===username) ? userImage : randomImage)} className="comment-profile" />
                    </div>
                    <div className="be-comment-content">
                        <span style={{fontSize: '18px'}}>
                            {comment.username}
                        </span>
                        <span style={{fontSize: '15px',color: '#b4b7c1', textAlign: 'right'}}>
                            {format(new Date(comment.created_at), 'MMM dd, yyyy hh:mma')}
                        </span>
                        
                            {comment.username === username || userRole === 'god' ? (
                                comment.id == editCommentId && isEditing ? (
                                    <>
                                        <textarea
                                            value={editCommentText}
                                            onChange={(e) => setEditCommentText(e.target.value)}
                                            className="form-edit"
                                            maxLength={300}
                                        ></textarea>
                                        <div className="comment-actions">
                                        <button className="btn-rename tm-text-gray" onClick={handleEditComment}>
                                            <i className="fas fa-check"></i>
                                        </button>
                                        <button className="btn-rename tm-text-gray" onClick={handleCancel}>
                                            <i className="fas fa-times"></i>
                                        </button>
                                        </div>
                                        </> 
                                    ) : (
                                        <div className="be-comment-text">
                                            {comment.comment}
                                            <div className="comment-actions">
                                            {comment.username === username ? (
                                                <button className='btn-rename tm-text-gray'><i class="fas fa-pencil-alt"onClick={() => handleShowEditForm(comment.id, comment.comment)} ></i></button>
                                            ):null}
                                            <button className='btn-rename tm-text-gray'><i class="fas fa-trash-alt"onClick={() => handleShowModal(comment.id)} ></i></button>
                                            </div>
                                        </div>
                                    )
                            ) :
                            <div className="be-comment-text">
                                {comment.comment}
                            </div>
                            }
                        </div>
                    </div>
                )) : (
                    <div className='no-comment'>Be the first to comment!</div>
                )}
                <form className="form-block">
                    <div className="row">
                        <div className="col-xs-12">									
                            <div className="form-group">
                                <textarea className="form-input" placeholder="Comment" value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} maxLength={300}></textarea>
                            </div>
                        </div>
                        <button className="btn btn-primary pull-right" onClick={handleCommentSubmit}>submit</button>
                    </div>
                </form>
            </div>

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Are you sure you want to delete this comment?</h2>
                        <button className="btn btn-danger" onClick={handleDeleteComment}>Yes, Delete</button>
                        <button className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewArt;