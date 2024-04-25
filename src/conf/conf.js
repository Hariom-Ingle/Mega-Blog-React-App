const conf ={ 
    appWriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appWriteDatabaseId:String(import.meta.env.VITE_DATABASE_ID),
    appWriteProjectId:String(import.meta.env.VITE_PROJECT_ID),
    appWriteCollectiontId:String(import.meta.env.VITE_COLLECTION_ID),
    appWriteBucketId:String(import.meta.env.VITE_BUCKET_ID),
}

export default conf