/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category Module and Routes
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategory:
 *              type: object
 *              required:
 *                  -   name
 *                  -   icon
 *              properties:
 *                  name:
 *                      type: string
 *                  icon:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  parent:
 *                      type: string
 */
/**
 * @swagger
 * /category:
 *  post:
 *      summary: create category
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *      responses:
 *          201:
 *              description: created successfully
 */

/**
 * @swagger
 * /category:
 *  get:
 *      summary: get all categories
 *      tags:
 *          -   Category
 *      responses:
 *          201:
 *              description: get successfully
 */
/**
 * @swagger
 * /category/{id}:
 *  get:
 *      summary: get  category by id
 *      tags:
 *          -   Category
 *      parameters:
 *          -   in: path
 *              name: id
 *      responses:
 *          201:
 *              description: get category successfully
 */
/**
 * @swagger
 * /category/{id}:
 *  delete:
 *      summary: delete  category by id
 *      tags:
 *          -   Category
 *      parameters:
 *          -   in: path
 *              name: id
 *      responses:
 *          201:
 *              description: get category successfully
 */