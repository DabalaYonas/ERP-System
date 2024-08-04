import { useSelector } from "react-redux";
import Breadcrumbs from "../../components/Breadcrumbs";


const breadcrumbItems = [
    {
      path: '/',
      title: 'Dashboard',
    }
  ];
function Dashboard() {
    // const user = useSelector((state) => state.user);

    return <>
        <Breadcrumbs items={breadcrumbItems} />
    </>
}

export default Dashboard;