import { useEffect, useState } from 'react';
import axios from 'axios';
import { SimpleButton } from '../components/Button/SimpleButton';
import { useFileAPI } from '../adapters/file/file';

export const Sample = () => {
  const onClick = async () => {
    try {
      const res = await useFileAPI.getDownloadUrl(22)
      const downloadRes = await fetch(res.download_link)
      if(!downloadRes.ok){
        return
      }
      const blob = await downloadRes.blob();
  
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = res.file_name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to initiate download:", error)
    }
  }

  return (
    <div>
      <SimpleButton onClick={onClick} label='download' type='button' />
    </div>
  );
};
