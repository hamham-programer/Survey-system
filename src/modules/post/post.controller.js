const autoBind = require("auto-bind");
const { PostMessage } = require("./post.message");
const HttpCodes = require("http-codes");
const postService = require("./post.service");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const { Types } = require("mongoose");
const { removePropertyInObject } = require("../../common/utils/function");
const { getAddressDetail } = require("../../common/utils/http");
const utf8 = require("utf8");
class PostController {
  #service;
  success_message;
  constructor() {
    autoBind(this);
    this.#service = postService;
  }
  
  async create(req, res, next) {
    try {
      const userId = req.user._id;
      const images = req?.files?.map((image) => image?.path?.slice(7));
      const {
        title_post: title,
        description: content,
        lat,
        lng,
        category,
        amount,
      } = req.body;
      if (!Types.ObjectId.isValid(category)) {
        return res.status(400).json({ error: 'Invalid category ID' });
    }
    const amountNumber = Number(amount);
        if (isNaN(amountNumber)) {
            return res.status(400).json({ error: 'Invalid amount value' });
        }
      const options = removePropertyInObject(req.body, [
        "amount",
        "title_post",
        "description",
        "lat",
        "lng",
        "category",
        "images",
      ]);
      for (let key in options) {
        let value = options[key];
        delete options[key];
        key = utf8.decode(key);
        options[key] = value;
      }
      const { address, province, city, district } = await getAddressDetail(
        lat,
        lng
      );
      await this.#service.create({
        userId,
        title,
        amount,
        content,
        coordinate: [lat, lng],
        category: new Types.ObjectId(category),
        images,
        options,
        address,
        province,
        city,
        district,
      });
      return res.json({
        message: PostMessage.Created,
      });
    } catch (error) {
      console.error("Error creating post:", error)
      
      next(error);
    }
  }
  async findMyPosts(req, res, next) {
    try {
      const userId = req.user._id;
      const posts = await this.#service.find(userId);
      res.json({
        posts,
        count: posts.length,
      });
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.remove(id);
      return res.json({
        message: PostMessage.Deleted,
      });
    } catch (error) {
      next(error);
    }
  }
  async showPost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await this.#service.checkExist(id);
      res.locals.layout = "./layouts/website/main.ejs";
      res.json({
        post,
      });
    } catch (error) {
      next(error);
    }
  }
  async postList(req, res, next) {
    try {
      const query = req.query;
      const posts = await this.#service.findAll(query);
      res.json({
        posts,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
