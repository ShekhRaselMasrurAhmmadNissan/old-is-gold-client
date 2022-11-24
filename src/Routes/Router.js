const { createBrowserRouter } = require('react-router-dom');
const { default: MainLayout } = require('../Layouts/MainLayout/MainLayout');

const router = createBrowserRouter([{ path: '/', element: <MainLayout /> }]);

export default router;
