const fs = require('fs');
const path = require('path');

const BACKUP_DIR = 'db/backup';

const readFiles = (DIR) => {
    return new Promise((resolve, reject) => {
        fs.readdir(DIR, (err, files) => {
            if (err) {
                reject('error')
            }
            resolve(files)
        });

    });
};

const getFormattedDate = (milliseconds) => {
    const d = new Date(parseInt(milliseconds));
    return d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
    d.getHours() + ":" + d.getMinutes();
}

/**
 * Download Backuped Files
 */
exports.getBackupFiles = async (req, res) => {
    try {
        const files = await readFiles(BACKUP_DIR);
        
        const resFiles = files.map(file => {
            const time = file.slice(0, file.length - 5).split('_')[1];
            return {
                name: file,
                time: getFormattedDate(time)
            }
        })
        res.status(200).json({
            files: resFiles
        })
    } catch(error) {
        res.status(403).json({
            error
        })
    }
    
}

/**
 * Download Function
 */
exports.download = function(req, res){
    const { fileName } = req.query;
    const rootpath = path.resolve(process.cwd());
    const file = `${rootpath}/${BACKUP_DIR}/${fileName}`;

    res.download(`${rootpath}/${BACKUP_DIR}/${fileName}`, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};
