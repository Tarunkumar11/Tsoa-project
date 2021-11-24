import EVN from  'dotenv'
import { CosmosClient } from '@azure/cosmos'

EVN.config()
const key = process.env.COSMOS_KEY
const endpoint = process.env.COSMOS_ENDPOINT
const databaseId = process.env.COSMOS_DATABASE
const containerId = process.env.COSMOS_CONTAINER

export async function connectDB(){
    const client = new CosmosClient({ endpoint, key });
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({
        id: containerId,
        partitionKey: { paths: ["/pk"] },
    });
}



export async function addItem(container, id) {
    const pk = "0";
    try{
        
        const response = await container.items.create({ id: id, pk });
        return response
    }
    catch(error){
        console.log(error)
    }
}


export async function getData(container, table) {    
    const querySpec = {
        query: `ELECT * from ${table}`
    }

    const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
    return resources
}


export async function createFromNowIterator(container) {

    const fromNowIterator = container.items.changeFeed(pk, {});

    fromNowIterator.map((v) => parseInt(v.id))

}



// class ConnetToDatabase {

//     constructor(client, key, endpoint, databaseId, containerId){
//         this.client = client
//         this.databaseId = databaseId
//         this.containerId = containerId
//         this.database = null;
//         this.container = null
//     }

//     connect() {

//         try{
            
//             const { database } = await this.client.databases.createIfNotExists({ id: databaseId });
//             const { container } = await this.database.containers.createIfNotExists({
//                 id: containerId,
//                 partitionKey: { paths: ["/pk"] },
//             });
//         }
        
//     }
// }