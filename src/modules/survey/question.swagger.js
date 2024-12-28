/**
 * @swagger
 * tags:
 *  name: Question
 *  description: Question Module and Routes
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Question:
 *      type: object
 *      required:
 *        - text
 *        - surveyId
 *        - type
 *      properties:
 *        text:
 *          type: string
 *          description: The text of the question
 *        surveyId:
 *          type: string
 *          description: The ID of the survey to which the question belongs
 *        type:
 *          type: string
 *          enum: ['multiple-choice', 'text']
 *          description: The type of the question
 *        options:
 *          type: array
 *          items:
 *            type: string
 *          description: List of options for multiple-choice questions
 */

/**
 * @swagger
 * /questions/create:
 *  post:
 *    summary: Create a new question
 *    tags: 
 *      - Question
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Question'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              text:
 *                type: string
 *              surveyId:
 *                type: string
 *              type:
 *                type: string
 *                enum: ['multiple-choice', 'text']
 *              options:
 *                type: array
 *                items:
 *                  type: string
 *    responses:
 *      201:
 *        description: Question created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                question:
 *                  $ref: '#/components/schemas/Question'
 *      404:
 *        description: Survey not found
 */

/**
 * @swagger
 * /questions/surveys/{surveyId}/questions:
 *  get:
 *    summary: Get all questions for a specific survey
 *    tags:
 *      - Question
 *    parameters:
 *      - in: path
 *        name: surveyId
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the survey
 *    responses:
 *      200:
 *        description: A list of questions for the survey
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Question'
 */

/**
 * @swagger
 * /questions/{id}:
 *  get:
 *    summary: Get a specific question by ID
 *    tags:
 *      - Question
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the question
 *    responses:
 *      200:
 *        description: Question details
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Question'
 *      404:
 *        description: Question not found
 */

/**
 * @swagger
 * /questions/{id}:
 *  put:
 *    summary: Update a specific question by ID
 *    tags:
 *      - Question
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the question to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Question'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              text:
 *                type: string
 *              type:
 *                type: string
 *                enum: ['multiple-choice', 'text']
 *              options:
 *                type: array
 *                items:
 *                  type: string
 *    responses:
 *      200:
 *        description: Question updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                question:
 *                  $ref: '#/components/schemas/Question'
 *      404:
 *        description: Question not found
 */

/**
 * @swagger
 * /questions/{id}:
 *  delete:
 *    summary: Delete a specific question by ID
 *    tags:
 *      - Question
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the question to delete
 *    responses:
 *      200:
 *        description: Question deleted successfully
 *      404:
 *        description: Question not found
 */
