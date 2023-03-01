//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 20th Nov., 2022  06:15 PM
// Project     : JUIDCO
// Component   : ClusterFormApi
// Description : Cluster api list
//////////////////////////////////////////////////////////////////////
import BackendUrl from './BackendUrl'
const CustomTabApi = () => {
    let baseUrl = BackendUrl; 

  let apiList = {
    getRemark: `${baseUrl}/api/property/get-all-custom-tab-data`,

    postRemark: `${baseUrl}/api/property/post-custom-data`,
  };

  return apiList;
};

export default CustomTabApi;
