'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _fs = require('fs');

var _idGenerator = require('../helpers/idGenerator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

var _apolloUploadServer = require('apollo-upload-server');

var _storage = require('@google-cloud/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const File = _models2.default.File;
const gcs = (0, _storage2.default)({
  projectId: 'qluster-asg-api',
  keyFilename: ".././storage-key.json"
});

const bucketName = 'qlusterasgimages';
const bucket = gcs.bucket(bucketName);
const uploadDir = 'https://storage.googleapis.com/';

const storeUpload = async ({ stream, filename }) => {
  const id = (0, _idGenerator2.default)();
  const path = `${uploadDir}/${bucketName}/${id}-${filename}`;

  return new Promise((resolve, reject) => stream.pipe((0, _fs.createWriteStream)(path)).on('finish', () => resolve({ id, path })).on('error', reject));
};

const recordFile = async file => await File.create(file);

const processUpload = async upload => {
  const { stream, filename, mimetype, encoding } = await upload;
  const { id, path } = await storeUpload({ stream, filename });
  return recordFile({ id, filename, mimetype, encoding, path });
};

exports.default = {
  Upload: _apolloUploadServer.GraphQLUpload,
  Query: {
    uploads: () => Files.findAll()
  },
  Mutation: {
    singleUpload: (obj, { file }) => processUpload(file),
    multipleUpload: (obj, { files }) => Promise.all(files.map(processUpload))
  }
};