import models from '../../models'
import { createWriteStream } from 'fs'
import gen from '../../helper/idGenerator'
import { GraphQLUpload } from 'apollo-upload-server'
import  storage from '@google-cloud/storage'

const File = models.File
const gcs = storage({
  projectId: 'qluster-asg-api',
  keyFilename: ".././storage-key.json"
});

const bucketName = 'qlusterasgimages'
const bucket = gcs.bucket(bucketName);
const uploadDir = 'https://storage.googleapis.com/'

const storeUpload = async ({ stream, filename }) => {
  const id = gen() 
  const path = `${uploadDir}/${bucketName}/${id}-${filename}`

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path }))
      .on('error', reject)
  )
}

const recordFile = async file => await File.create(file)

const processUpload = async upload => {
  const { stream, filename, mimetype, encoding } = await upload
  const { id, path } = await storeUpload({ stream, filename })
  return recordFile({ id, filename, mimetype, encoding, path })
}

export default {
  Upload: GraphQLUpload,
  Query: {
    uploads: () => Files.findAll()
  },
  Mutation: {
    singleUpload: (obj, { file }) => processUpload(file),
    multipleUpload: (obj, { files }) => Promise.all(files.map(processUpload))
  }
}