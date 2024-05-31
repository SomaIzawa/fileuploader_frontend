import React, { useState } from 'react';
import axios from 'axios';

const FileUploadForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [filenames, setFilenames] = useState<string[]>([]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleFilenamesChange = (index: number, newFilename: string) => {
    const updatedFilenames = [...filenames];
    updatedFilenames[index] = newFilename;
    setFilenames(updatedFilenames);
  };

  const addFilenameField = () => {
    setFilenames([...filenames, '']);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('comment', comment);
    formData.append('categoryId', categoryId);
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    filenames.forEach((filename, index) => {
      formData.append(`filenames[${index}]`, filename);
    });

    try {
      const response = await axios.post('YOUR_API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('There was an error uploading the file!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <input 
          type="text" 
          id="comment" 
          name="comment" 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="categoryId">Category ID:</label>
        <input 
          type="text" 
          id="categoryId" 
          name="categoryId" 
          value={categoryId} 
          onChange={(e) => setCategoryId(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="thumbnail">Thumbnail:</label>
        <input 
          type="file" 
          id="thumbnail" 
          name="thumbnail" 
          onChange={handleThumbnailChange} 
        />
      </div>
      <div>
        <label htmlFor="files">Files:</label>
        <input 
          type="file" 
          id="files" 
          name="files" 
          multiple 
          onChange={handleFilesChange} 
        />
      </div>
      <div>
        <label>Filenames:</label>
        {filenames.map((filename, index) => (
          <div key={index}>
            <input 
              type="text" 
              value={filename} 
              onChange={(e) => handleFilenamesChange(index, e.target.value)} 
            />
          </div>
        ))}
        <button type="button" onClick={addFilenameField}>Add Filename</button>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FileUploadForm;
