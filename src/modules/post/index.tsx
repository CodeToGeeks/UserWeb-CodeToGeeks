import { Post } from '@models/Post.model'
import React from 'react'
import AuthorDetails from './components/AuthorDetails'
import Interactions from './components/Interactions'
import PostContainer from './components/PostContainer'
import styles from './styles/index.module.scss'
const post: Post = {
  _id: 'b5a4615d-9df0-472f-b1d7-b87f2c9baa9f',
  title: 'MongoDB GridFS',
  slug: 'MongoDB GridFS',
  cover_image_link:
    'https://codetogeeks.s3.me-south-1.amazonaws.com/postCovers/173d1294-e17e-4b3b-8271-6c41332610fc.jpg',
  excerpt: 'How to use Mongodb to save file (GridFS).',
  tags: [],
  md: "\"# Introduction\nIn fact, when you come to choosing your uploading methodology, there are a lot of options you can go with. One of these options is saving your files as binary data into the database, **MongoDB GridFS** applies this pattern. It is a file system abstraction on top of **MongoDB** in which the uploaded file is divided into chunks during the uploading process and reassembled during retrieval.\n\n# How GridFS Works\nLets represent how **GridFS** works in simple steps:\n\n- During the first file upload, a new bucket ```fs ```(unless you specify its name) will be created (if not exist) and this bucket consists of two collections (```fs.chunks``` and ```fs.files```).\n- A new index will be created (if not exist) in both collections for the sake of fast retrieval.\n- The uploaded file will be divided into chunks (by default **255KB** per chunk unless you specify the chunk size) and stored in the ```fs.chunks``` collection. And to track the uploaded file portions ordering, this collection contains a field ```n``` which is the portion order.\n- A new metadata document will be created for the uploaded file in the ```fs.files``` collection containing its ```length```, ```chunkSize```, ```uploadedDate```, filename, and contentType.\n- In the retrieval process, ***GridFS*** gets the file metadata from ```fs.files``` collection and uses this data to reassemble the file chunks from ```fs.chunks``` collection and return the file to the client as a stream or in memory.\n----\n\n# When to Use GridFS over ordinary Filesystem Storage\nIn fact, you can go with **GridFS** if you have a requirement of these:\n\n- If your file size exceeds **16MB** (which is the default **MongoDB** document size limit).\n- If you frequently want to access or update specific file portions without retrieving the entire file into memory.\n- If your file system limits the number of files in a directory, you can use **GridFS **to store as many files as you need.\n- If you want to track the metadata of your files. Which is provided as a built-in feature in **GridFS**.\n- As your files are part of your database, then your files can benefit from **MongoDB's **built-in [replication](https://en.wikipedia.org/wiki/Replication), backup, and [sharding ](https://en.wikipedia.org/wiki/Shard_(database_architecture))features instead of\n\n ![alt](https://codetogeeks.s3.me-south-1.amazonaws.com/files/mongo.jpeg)\n\n # Hands-on example using Node.js\n\nIn this example, we will know how to upload, download and retrieve files from a bucket using **GridFS**.\n\nFirst of all, lets create (if not exist) or retrieve our bucket:\n\n```javascript\nlet bucket;\nconst connection = mongoose.createConnection('mongodb://localhost:27017/gridfs'); // `gridfs` is the database, you can name it as you want\n// Listen to the open of the database connection to create (if not exist) or retrieve our bucket reference\nconnection.once('open', () => {\n  bucket = new mongoose.mongo.GridFSBucket(connection, {\n    bucketName: 'uploads', // Override the default bucket name (fs)\n    chunkSizeBytes: 1048576 // Override the default chunk size (255KB)\n  });\n});\n```  \n\nLets upload a file using **GridFS** :\n\n```javascript\n// With first upload, the `uploads` bucket will be created if not exist\nconst storage = new GridFsStorage({\n  db: connection,\n  file: (req, file) => ({\n    filename: `${file.originalname}_${Date.now()}`, // Override the default filename\n    bucketName: 'uploads', // Override the default bucket name (fs)\n    chunkSize: 500000, // Override the default chunk size (255KB)\n    metadata: { uploadedBy: 'Someone', downloadCount: 4 } // Attach any metadata to the uploaded file\n  })\n});\nconst upload = multer({ storage }); // Use GridFS as a multer storage\n\n// Use multer as a middleware to upload the file\napp.post('/upload', upload.single('file'), (req, res) => {\n  res.json(req.file);\n});\n```  \n\nBear in mind, that you can depend on the previous code to create your bucket during the first upload instead of the first step. But to guarantee the bucket creation after database connection and having a reference to the bucket.\n\nLets list our files metadata:\n\n```javascript\napp.get('/metadata', async (req, res) => {\n  try {\n    // The find() method returns a cursor that manages the results of your query\n    const cursor = bucket.find({});\n    // Retrieve the data as array\n    const filesMetadata = await cursor.toArray();\n    res.json(filesMetadata);\n  } catch (err) {\n    res.json({ err: `Error: ${err.message}` });\n  }\n});\n```  \n\n\"",
  author_name: 'feloria rande',
  author_profile_image:
    'https://codetogeeks.s3.me-south-1.amazonaws.com/postCovers/173d1294-e17e-4b3b-8271-6c41332610fc.jpg',
  created_at: new Date('2022-04-15T04:51:51.925Z'),
  count_minutes_read: 10,

  love_count: 10,
}

const author = {
  _id: 'aaa',
  name: post.author_name,
  profile_image: post.author_profile_image,
}
const PostDetails = () => {
  return (
    <div className={`${styles.mainWrapper} ${styles.post}`}>
      <Interactions />
      <PostContainer post={post} />
      <AuthorDetails author={author} date={new Date(post.created_at)} />
    </div>
  )
}

export default PostDetails
