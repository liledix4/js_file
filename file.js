export async function readFile(files, callback, charset = 'UTF-8') {
  const reader = new FileReader();
  Object.keys(files).forEach(fileKey => {
    reader.readAsText(files[fileKey], charset);
    reader.onload = function(event) {
      callback(event.target.result);
    }
    reader.onerror = () => {
      console.error('Unable to read file.');
    }
  });
}


// https://stackoverflow.com/a/18197511
export function saveToFile(filename, text, mime = 'text/plain', charset = 'utf-8') {
  const pom = document.createElement('a');
  pom.setAttribute('href', `data:${mime};charset=${charset},` + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  if (document.createEvent) {
    const event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
  }
  else
    pom.click();

  pom.remove();
}