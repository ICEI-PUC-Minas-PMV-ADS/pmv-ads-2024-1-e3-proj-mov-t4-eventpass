using Azure.Storage.Blobs;
using System;
using System.IO;
using System.Reflection.Metadata;
using System.Threading.Tasks;

namespace EventPass.Services
{
    public class StorageService
    {
        private readonly IConfiguration Configuration;
        private readonly string CONTAINER_NAME = "images";

        public StorageService(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public async Task<string> SaveImage(IFormFile formFile)
        {
            string connectionString = Configuration["ConnectionStrings:ImageStorageAccountConnection"];

            // Cria uma instância do BlobServiceClient usando a string de conexão
            BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);

            // Cria uma referência ao container onde a imagem será armazenada
            BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(CONTAINER_NAME);
            await containerClient.CreateIfNotExistsAsync();

            // Define o nome do blob (arquivo) que será criado no container
            string blobName = Guid.NewGuid().ToString() + "_" + formFile.FileName;

            // Cria uma referência ao blob que será criado no container
            BlobClient blobClient = containerClient.GetBlobClient(blobName);

            // Abre e faz upload da imagem para o blob
            using (Stream fileStream = formFile.OpenReadStream())
            {
                await blobClient.UploadAsync(fileStream, true);
            }

            return blobName;
        }
    }
}
