import React, { useEffect, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Navigation, Table, TH, Button } from 'components';
import db, { firebase } from 'config/firebase';
import { Global } from 'contexts';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const { user } = useContext(Global);
  const [files, setFiles] = useState({});

  const uploadFile = useCallback(
    (e) => {
      const [file] = e.target.files;
      if (file && user.permissions.create) {
        const toastId = toast(`Uploading ${file.name}...`, {
          autoClose: false,
        });
        const ref = firebase.storage().ref();
        ref
          .child(`drive/${Date.now()}_${file.name}`)
          .put(file)
          .then(({ ref }) => ref.getDownloadURL())
          .then((value) => {
            const data = {
              name: file.name,
              size: file.size,
              url: value,
              uploadedAt: Date.now(),
              uploader: user.displayName,
            };
            return { data, ref: db.ref('files').push(data) };
          })
          .then(({ data, ref }) => {
            setFiles((prev) => ({ ...prev, [ref.key]: data }));
            toast.update(toastId, {
              render: `${file.name} successfully uploaded.`,
              type: toast.TYPE.SUCCESS,
              autoClose: 5000,
            });
          })
          .catch(() => {
            toast.update(toastId, {
              render: `Failed to upload ${file.name}`,
              type: toast.TYPE.ERROR,
            });
          });
      }
    },
    [user]
  );

  const deleteFile = useCallback(
    (key, file) => {
      if (user.permissions.delete) {
        const toastId = toast(`Deleting ${file.name}`, { autoClose: false });
        db.ref('files')
          .child(key)
          .remove()
          .then(() =>
            setFiles((oldFiles) => {
              const newFiles = { ...oldFiles };
              // eslint-disable-next-line no-unused-vars
              const { [key]: removedFile, ...restFiles } = newFiles;
              return restFiles;
            })
          )
          .then(() => {
            const storage = firebase.storage().ref();
            return storage
              .child('drive/' + file.url.split('/drive%2F')[1].split('?')[0])
              .delete();
          })
          .then(() => {
            toast.update(toastId, {
              render: `${file.name} successfully deleted.`,
              type: toast.TYPE.SUCCESS,
              autoClose: 5000,
            });
          })
          .catch(() => {
            toast.update(toastId, {
              render: `Failed to delete ${file.name}`,
              type: toast.TYPE.ERROR,
            });
          });
      }
    },
    [user]
  );

  useEffect(() => {
    document.title = 'Drive';
    const ref = db.ref('files').orderByKey();
    ref.once('value').then((snapshot) => {
      const val = snapshot.val();
      if (val) setFiles(val);
    });
  }, []);

  return (
    <Navigation>
      <Table
        before={
          user.permissions.create && (
            <div className="w-32 inline-block mb-4">
              <Button>
                <label htmlFor="file" className="cursor-pointer">
                  Upload
                </label>
              </Button>
              <input
                className="hidden"
                type="file"
                id="file"
                onChange={uploadFile}
              />
            </div>
          )
        }
      >
        <thead>
          <tr>
            {['File name', 'Date created', 'Size'].map((elm, i) => (
              <TH key={i.toString()}>{elm}</TH>
            ))}
            {user.permissions.delete && (
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white">
          {Object.keys(files).map((key) => (
            <TRD
              key={key}
              fileName={files[key].name}
              uploader={files[key].uploader}
              uploadedAt={files[key].uploadedAt}
              size={files[key].size}
              url={user.permissions.read && files[key].url}
            >
              {user.permissions.delete && (
                <td className="cursor-pointer px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                  <span
                    className="text-red-600 hover:text-red-900 focus:outline-none focus:underline"
                    onClick={() => deleteFile(key, files[key])}
                  >
                    Delete
                  </span>
                </td>
              )}
            </TRD>
          ))}
        </tbody>
      </Table>
    </Navigation>
  );
}

const TRD = ({ fileName, uploader, uploadedAt, size, children, url }) => (
  <tr>
    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10">
          <img
            className="h-10 w-10"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUMPEezOHI_ZNIyD3PY_sfs0m8-ZCOFTfFbmonGBZMNKZQjXcj&usqp=CAU"
            alt=""
          />
        </div>
        <div className="ml-4 overflow-hidden">
          <div
            className="text-sm leading-5 font-medium text-gray-900 cursor-pointer truncate"
            onClick={() => url && window.open(url)}
          >
            {fileName}
          </div>
          <div className="text-sm leading-5 text-gray-500">{uploader}</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
      {`${new Date(uploadedAt).getDate()}/${new Date(
        uploadedAt
      ).getMonth()}/${new Date(uploadedAt).getFullYear()}`}
    </td>

    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <span className="px-2 mr-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        {formatBytes(size)}
      </span>
    </td>

    {children}
  </tr>
);

TRD.propTypes = {
  fileName: PropTypes.string,
  uploader: PropTypes.string,
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  size: PropTypes.number,
  uploadedAt: PropTypes.number,
  handleDelete: PropTypes.func,
};

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
