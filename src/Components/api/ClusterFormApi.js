//////////////////////////////////////////////////////////////////////
// Author      : R U Bharti
// Date        : 20th Nov., 2022  06:15 PM
// Project     : JUIDCO
// Component   : ClusterFormApi
// Description : Cluster api list
//////////////////////////////////////////////////////////////////////

const ClusterFormApi = () => {

    const baseUrlT = 'http://203.129.217.245:80'
    const baseUrl = 'http://192.168.0.16:8000'

    // const token = '1756|TboTCPMMkGagRka00NStFFK0xsFOqhXkd7lAAYfc'

    let apiList = {
        
        // Getting all cluster
        getCluster : `${baseUrl}/api/property/cluster/get-all-clusters`,

        // Adding cluster
        addCluster : `${baseUrl}/api/property/cluster/save-cluster-details`,

        // Viewing Cluster
        viewCluster : `${baseUrl}/api/property/cluster/get-cluster-by-id`,

        // Updating Cluster 
        updateCluster : `${baseUrl}/api/property/cluster/edit-cluster-details`,

        // Delete Cluster
        deleteCluster : `${baseUrl}/api/property/cluster/delete-cluster-data`,

        // view holding under cluster
        viewHolding : `${baseUrl}/api/property/cluster/holding-by-cluster`,

        // search holding
        searchHolding : `${baseUrl}/api/property/cluster/details-by-holding`,

        // search SAF
        searchSaf : `${baseUrl}/api/property/cluster/get-saf-by-safno`,

        // map holding
        mapHoldingApi : `${baseUrl}/api/property/cluster/save-holding-in-cluster`,

        // map SAF
        mapSafApi : `${baseUrl}/api/property/cluster/save-saf-in-cluster`,

    }

    return apiList;

}

export default ClusterFormApi