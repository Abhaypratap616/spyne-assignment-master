const Discussion = require("../../models/Discussion");
const { responseTemplate, responseMessage } = require("../../utils/response");
const { NODE_ENV } = process.env;
const bucketFolder = NODE_ENV === "producation" ? "prod" : "stage";

const updateDiscussion = async (req, res) => {
  try {
    const { text, hashTags } = req.body;
    const { image, otherImages } = req.files;
    const { creatorId } = req.user;
    const { discussionId } = req.params;

    const findDiscussion = await Discussion.findOne({
      $and: [{ creatorId }, { _id: discussionId }],
    });

    if (!findDiscussion) {
      return res
        .status(404)
        .json(await responseTemplate(false, "Discussion not found", null));
    }

    const fileName = findDiscussion.image;
    const imageUrl = `https://oia-shopmylook.s3.amazonaws.com/${bucketFolder}/${findDiscussion.image}`
    if(image){
        imageUrl = await uploadFileToS3Bucket(
            fileName,
            image[0].buffer,
            "image/jpeg"
          );
      
    }
    let otherImagesUrl;
    if (otherImages?.length > 0) {
      otherImagesUrl = await Promise.all(
        otherImages.map(async (file, idx) => {
          return uploadFileToS3Bucket(
            `${fileName}${idx}`,
            file.buffer,
            "image/jpeg"
          );
        })
      );
    }
    const updatedDiscussion = await Discussion.findByIdAndUpdate(
      { $and: [{ creatorId }, { _id: discussionId }] },
      {
        creatorId,
        text,
        hashTags,
        otherImages: otherImages?.length || 0,
      }
    ).save();

    return res.status(200).json(
      await responseTemplate(true, "Discussion successfully updated", {
        ...updatedDiscussion,
        otherImagesUrl,
        imageUrl,
      })
    );
  } catch (err) {
    console.error(`error : ${err}`);
    return res
      .status(500)
      .json(
        await responseTemplate(false, responseMessage.serverError, null, err)
      );
  }
};

const deletDiscussion = async (req, res) => {
    try {
      const { _id: creatorId} = req.user;
      const { discussionId } = req.params; 
  
      const findDiscussion = await Discussion.findOneAndDelete({
        $and: [{ creatorId }, { _id: discussionId }],
      });

      if (!findDiscussion)
        return res
          .status(400)
          .json(
            await responseTemplate(
              false,
              "Discussion does not exists",
            )
          );
  
      return res
        .status(200)
        .json(
          await responseTemplate(
            true,
            "Discussion successfully deleted",
          )
        );
    } catch (err) {
      console.error(`error : ${err}`);
      return res
        .status(500)
        .json(
          await responseTemplate(false, responseMessage.badRequest, null, err)
        );
    }
  };


module.exports = { updateDiscussion, deletDiscussion };