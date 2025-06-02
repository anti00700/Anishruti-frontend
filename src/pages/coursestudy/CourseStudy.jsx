import React, { useEffect } from "react";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id, fetchCourse]);

  return (
    <>
      {course && (
        <div className="course-study-page">
          <img src={`${server}/${course.image}`} alt="" width={350} />
          <h2 className="course-title">{course.title}</h2>
          <h4>{course.description}</h4>
          <h5>by - {course.createdBy}</h5>
          <h5>Duration - {course.duration} weeks</h5>
          <h5>Category - {course.category}</h5>
          <Link to={`/lectures/${course._id}`} className="lecture-link">
            Lectures
          </Link>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
