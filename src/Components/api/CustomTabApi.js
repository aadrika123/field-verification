//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 20th Nov., 2022  06:15 PM
// Project     : JUIDCO
// Component   : ClusterFormApi
// Description : Cluster api list
//////////////////////////////////////////////////////////////////////

const CustomTabApi = () => {
  const baseUrl = "http://192.168.0.16:8000/api/property"; 

  let apiList = {
    getRemark: `${baseUrl}/get-all-custom-tab-data`,

    postRemark: `${baseUrl}/post-custom-data`,
  };

  return apiList;
};

export default CustomTabApi;
