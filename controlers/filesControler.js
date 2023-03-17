const fs = require("fs")
// files mongoose schame
const GridFile = require("../models/filesTable/filesSchame");
//secrets
const SECRET = require("..//config")

class FilesControler {
  async uploadFile(req, res, nxt) {
    try {
      let info;
      // uploaded file are accessible as req.files
      if (req.files) {
        // console.log(req)
        const promises = req.files.map(async (file) => {
          const fileStream = fs.createReadStream(file.path)
          // upload file to gridfs
          const gridFile = new GridFile({ filename: file.originalname })
          await gridFile.upload(fileStream)
          // delete the file from local folder
          fs.unlinkSync(file.path)
          const data = await GridFile.find({ gridFile })
          info = data[data.length - 1]
        })
        await Promise.all(promises)
        res.send(SECRET.SECRET.URL_LOCAL_SERVER + "/hydra/files/" + info._id + "/" + info.filename)
      }
    } catch (err) {
      nxt(err)
      res.send("uploading err")
    }
  }

  async getFile(req, res, nxt) {
    try {
      const { id, name } = req.params

      const gridFile = await GridFile.findById(id)

      if (gridFile) {
        res.attachment(name)
        gridFile.downloadStream(res)
      } else {
        // file not found
        res.status(404).json({ error: 'file not found' })
      }
    } catch (err) {
      nxt(err)
    }
  }
}

module.exports = new FilesControler()
