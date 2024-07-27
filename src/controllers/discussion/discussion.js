const Discussion = require("../../models/Discussion");
const { responseTemplate, responseMessage } = require("../../utils/response");
const { NODE_ENV } = process.env;
const bucketFolder = NODE_ENV === "prod" ? "prod" : "stage";

const createDiscussion = async (req, res) => {
  try {
    const { text, hashTags } = req.body;
    const { image, otherImages } = req.files;
    const { creatorId } = req.user;
    const fileName = `${creatorId}_${Date.now()}_upload`;
    const imageUrl = await uploadFileToS3Bucket(
      fileName,
      image[0].buffer,
      "image/jpeg"
    );
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

    const newDiscussion = new Discussion({
      creatorId,
      text,
      hashTags,
      image: fileName,
      otherImages: otherImages?.length || 0,
    })

    const saveDiscussion = await newDiscussion.save();

    return res.status(201).json(
      await responseTemplate(true, "Discussion successfully created", {
        saveDiscussion,
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

const getDiscussion = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const getDiscussion = await Discussion.findByIdAndUpdate(
      discussionId,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!getDiscussion) {
      return res
        .status(404)
        .json(await responseTemplate(false, "Discussion not found", null));
    }
    const finalData = [getDiscussion]?.map((discussion) => {
      const {
        _id,
        creatorId,
        text,
        hashTags,
        views,
        otherImages,
        likeBy,
        commmentedBy,
        image,
      } = discussion;
      const otherImagesArray = [];
      for (let i = 1; i <= otherImages; i++) {
        otherImagesArray.push(
          `https://oia-shopmylook.s3.amazonaws.com/${bucketFolder}/${image}${i}`
        );
      }
      const thumbnail = `https://oia-shopmylook.s3.amazonaws.com/${bucketFolder}/${image}`;
      return {
        _id,
        creatorId,
        text,
        hashTags,
        image: thumbnail,
        otherImages: otherImagesArray,
        views,
        totalLikes: likeBy?.length || 0,
        totalComments: commmentedBy?.length || 0,
      };
    });
    return res
      .status(200)
      .json(
        await responseTemplate(
          true,
          "Discussion successfully fetched",
          finalData
        )
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

const getAllDiscussion = async (req, res) => {
  try {
    const allDiscussion = await Discussion.find();

    if (!allDiscussion) {
      return res
        .status(404)
        .json(await responseTemplate(false, "Discussion not found", null));
    }

    const finalData = allDiscussion?.map((discussion) => {
      const {
        _id,
        creatorId,
        text,
        hashTags,
        views,
        otherImages,
        likeBy,
        commmentedBy,
        image,
      } = discussion;
      const otherImagesArray = [];
      for (let i = 1; i <= otherImages; i++) {
        otherImagesArray.push(
          `https://oia-shopmylook.s3.amazonaws.com/${bucketFolder}/${image}${i}`
        );
      }
      const thumbnail = `https://oia-shopmylook.s3.amazonaws.com/${bucketFolder}/${image}`;
      return {
        _id,
        creatorId,
        text,
        hashTags,
        image: thumbnail,
        otherImages: otherImagesArray,
        views,
        totalLikes: likeBy?.length || 0,
        totalComments: commmentedBy?.length || 0,
      };
    });

    return res
      .status(200)
      .json(
        await responseTemplate(
          true,
          "Discussion successfully fetched",
          finalData
        )
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

const getDiscussionByTags = async (req, res) => {
  try {
    const { hashTags } = req.query;
    const getDiscussion = await Discussion.find({
      hashTags: { $in: hashTags },
    });
    if (!getDiscussion) {
      return res
        .status(404)
        .json(await responseTemplate(false, "Discussion not found", null));
    }
    const finalData = getDiscussion?.map((discussion) => {
      const {
        _id,
        creatorId,
        text,
        hashTags,
        views,
        otherImages,
        likeBy,
        commmentedBy,
        image,
      } = discussion;
      const otherImagesArray = [];
      for (let i = 1; i <= otherImages; i++) {
        otherImagesArray.push(
          `https://oia-shopmylook.s3.amazonaws.com/${bucketFolder}/${image}${i}`
        );
      }
      const thumbnail = `https://oia-shopmylook.s3.amazonaws.com/${bucketFolder}/${image}`;
      return {
        _id,
        creatorId,
        text,
        hashTags,
        image: thumbnail,
        otherImages: otherImagesArray,
        views,
        totalLikes: likeBy?.length || 0,
        totalComments: commmentedBy?.length || 0,
      };
    });
    return res
      .status(200)
      .json(
        await responseTemplate(
          true,
          "Discussion successfully fetched",
          finalData
        )
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

const getDiscussionByTextSearch = async (req, res) => {
  try {
    const { text } = req.params;
    const getDiscussion = await Discussion.find({
      text: { $regex: text, $options: "i" },
    });
    if (!getDiscussion) {
      return res
        .status(404)
        .json(await responseTemplate(false, "Discussion not found", null));
    }
    const finalData = getDiscussion?.map((discussion) => {
      const {
        _id,
        creatorId,
        text,
        hashTags,
        views,
        otherImages,
        likeBy,
        commmentedBy,
        image,
      } = discussion;
      const otherImagesArray = [];
      for (let i = 1; i <= otherImages; i++) {
        otherImagesArray.push(
          `https://oia-shopmylook.s3.amazonaws.com/${bucketFolder}/${image}${i}`
        );
      }
      const thumbnail = `https://oia-shopmylook.s3.amazonaws.com/${bucketFolder}/${image}`;
      return {
        _id,
        creatorId,
        text,
        hashTags,
        image: thumbnail,
        otherImages: otherImagesArray,
        views,
        totalLikes: likeBy?.length || 0,
        totalComments: commmentedBy?.length || 0,
      };
    });
    return res
      .status(200)
      .json(
        await responseTemplate(
          true,
          "Discussion successfully fetched",
          finalData
        )
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

module.exports = {
  createDiscussion,
  getDiscussion,
  getAllDiscussion,
  getDiscussionByTags,
  getDiscussionByTextSearch,
};
