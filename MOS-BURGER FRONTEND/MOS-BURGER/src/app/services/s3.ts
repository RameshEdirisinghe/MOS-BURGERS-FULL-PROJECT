import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Buffer } from 'buffer';

@Injectable({
    providedIn: 'root',
  })
  export class AwsS3Service {
    private s3Client: S3Client;
  
    constructor() {
      this.s3Client = new S3Client({
        region: 'eu-north-1',
        credentials: {
          accessKeyId: 'enter your access key here',
          secretAccessKey: 'enter your secret access key here',
        },
      });
    }
  
    async uploadFile(file: File): Promise<string> {
      try {
        const command = new PutObjectCommand({
          Bucket: 'mosburger',
          Key: file.name,
          Body: Buffer.from(await file.arrayBuffer()),
          ContentType: file.type,
        });
  
        await this.s3Client.send(command);
  
        // Return the URL of the uploaded file
        return `https://mosburger.s3.eu-north-1.amazonaws.com/${file.name}`;
      } catch (error) {
        console.error('Upload error:', error);
        throw error;
      }
    }
  }