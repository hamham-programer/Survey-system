/**
 * @swagger
 * tags:
 *  name: Survey
 *  description: Survey Module and Routes
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    Survey:
 *      type: object
 *      required:
 *        - title
 *        - questions
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        questions:
 *          type: array
 *          items:
 *            type: string
 */

/**
 * @swagger
 * /survey/create:
 *  post:
 *    summary: Create a new survey
 *    tags: 
 *      - Survey
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Survey'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/Survey'
 *    responses:
 *      200:
 *        description: Survey created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                survey:
 *                  $ref: '#/components/schemas/Survey'
 */

/**
 * @swagger
 * /survey:
 *  get:
 *    summary: Get all surveys
 *    tags:
 *      - Survey
 *    responses:
 *      200:
 *        description: A list of surveys
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Survey'
 */

/**
 * @swagger
 * /survey/{id}:
 *  get:
 *    summary: Get a specific survey by ID
 *    tags:
 *      - Survey
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the survey
 *    responses:
 *      200:
 *        description: Survey details
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Survey'
 *      404:
 *        description: Survey not found
 */

/**
 * @swagger
 * /survey/{id}:
 *  delete:
 *    summary: Delete a survey by ID
 *    tags:
 *      - Survey
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the survey to delete
 *    responses:
 *      200:
 *        description: Survey deleted successfully
 *      404:
 *        description: Survey not found
 */
