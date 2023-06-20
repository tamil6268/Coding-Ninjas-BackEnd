const {MongoClient}=require('mongodb');
const url="mongodb+srv://ts7371797:Tamil123@cluster0.ubjr3my.mongodb.net/";
// const url="mongodb://127.0.0.1:27017";
const client=new MongoClient(url);

const insertDb=async(data)=>{
    await client.connect();
    const db=client.db('CodingNinja');//database name
    const collection=db.collection('UserDetails');//collection name
    const insert=await collection.insertOne(data);
    await client.close();
    return insert;
}
const insertRequestDb=async(data)=>{
    await client.connect();
    const db=client.db('CodingNinja');//database name
    const collection=db.collection('RequestDetails');//collection name
    const insert=await collection.insertOne(data);
    await client.close();
    return insert;
}
const findDb=async(name)=>{
    await client.connect();
    const db=client.db('CodingNinja');//database name
    const collection=db.collection('UserDetails');//collection name
    const find=await collection.find(name).toArray();
    await client.close();
    return find;
}
const insertEntrolledUsersDb=async(data)=>{
    await client.connect();
    const db=client.db('CodingNinja');//database name
    const collection=db.collection('EntrolledUsersProfile');//collection name
    const insert=await collection.insertOne(data);
    await client.close();
    return insert;
}
const EntorlledUsersupdateDb=async(filter,value)=>{
    await client.connect();
    const db=client.db('CodingNinja');
    const collection=db.collection('UserDetails');
    const update=await collection.updateMany(filter,value);
    await client.close();
    return update;
}
const deleteDb=async(name)=>{
    await client.connect();
    const db=client.db('CodingNinja');//database name
    const collection=db.collection('UserDetails');//collection name
    const todelete=await collection.deleteMany(name);
    await client.close();
    return todelete;
}
module.exports={
    insertDb,
    findDb,
    deleteDb,
    insertRequestDb,
    insertEntrolledUsersDb,
    // findEntrolledUsersDb
    EntorlledUsersupdateDb
}