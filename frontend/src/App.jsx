import React from 'react';
import Layout from './components/layout/layout/Layout';
import TasksPage from './pages/taskpage/TasksPage';

function App() {
  return (
    <Layout>
      <TasksPage />
    </Layout>
  );
}

export default App;