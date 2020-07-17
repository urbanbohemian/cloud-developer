const todosBucketName = process.env.TODOS_S3_BUCKET;
const signedUrlExpiration = process.env.SIGNED_URL_EXPIRATION
const todosTableName = process.env.TODOS_TABLE;
const todosTableIndexName = process.env.TODOS_INDEX_NAME;
const isOffline = process.env.IS_OFFLINE;

export {
    todosBucketName,
    signedUrlExpiration,
    todosTableName,
    todosTableIndexName,
    isOffline
};