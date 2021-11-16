# User-Job Application

### OverView
The User-job application is build by considering applicant and admin perspective. where applicant can apply for the job based on the available job options. and in Admindashboard admin can view the job applications based on the jobcategory selected, of which admin can shortlist or reject candidate based on his profile.pagination is also add for navigating through the application.

### Dependencies
- axios `npm install axios`
- react-router-dom `npm install react-router-dom`
- validator `npm install validator`
- sweetalert `npm install sweetalert`
- MaterialUI `npm install @material-ui/core`

### Details

* Navigations
  - to navigate amoung the Form and Admindashboard
* Applicant/job Form
  - used axios POST method to send data to server.
* AdminDashboard
  - used axios GET method to get all the applications based on the selected job profile
  - can view the applicant details
  - can shortlist/reject candidate 
* Pagination
  - to navigate amoung the pages

### API Details
- POST: `https://dct-application-form.herokuapp.com/users/application-form`
- GET: `https://dct-application-form.herokuapp.com/users/application-forms`

### link to view project demo
https://user-job.netlify.app/
