import boto3

# Configure your Minio/S3 credentials and endpoint
minio_endpoint = 'http://192.168.1.2:9000'  # Replace with your Minio server's URL
access_key = 'FRBTDIM3II8VUUOO9FWB'
secret_key = 'Dx3+LRZtmuemZv0WQPdEg1HdLPxOavl213V5LDuE'
bucket_name = 'hack-bucket'

# Initialize the S3 client
s3 = boto3.client(
    's3',
    endpoint_url=minio_endpoint,
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_key,
)

# Upload a file to the bucket
file_to_upload = 'README.md'
object_key = 'uploaded_file.txt'
s3.upload_file(file_to_upload, bucket_name, object_key)

print(f'File "{file_to_upload}" uploaded as "{object_key}" to the bucket "{bucket_name}".')

# Download the uploaded file
downloaded_file = 'downloaded_file.txt'
s3.download_file(bucket_name, object_key, downloaded_file)

print(f'File "{object_key}" downloaded as "{downloaded_file}".')

# Clean up by deleting the uploaded file
s3.delete_object(Bucket=bucket_name, Key=object_key)
print(f'File "{object_key}" deleted from the bucket "{bucket_name}".')
