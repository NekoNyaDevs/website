const azure = require('@azure/storage-blob');


class Blobs {
    constructor(account, key) {
        this.account = account;
        this.key = key;
        this.blobServiceClient = new azure.BlobServiceClient(
            `https://${this.account}.blob.core.windows.net`,
            new azure.StorageSharedKeyCredential(this.account, this.key)
        );
    };

    /**
     * Get a container client
     * @param {string} containerName
     * @returns {azure.ContainerClient}
     */
    getContainerClient(containerName) {
        return this.blobServiceClient.getContainerClient(containerName);
    };
}

module.exports = Blobs;