const Dashboard = () => {
    const name = localStorage.getItem('name');
    return (
      <div>
        <h1>Welcome, {name}</h1>
      </div>
    );
  };
  
  export default Dashboard;
  