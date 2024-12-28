/**
 * @swagger
 * tags:
 *  name: Response
 *  description: Response Module and Routes
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Response:
 *      type: object
 *      required:
 *        - surveyId
 *        - answers
 *      properties:
 *        surveyId:
 *          type: string
 *          description: The ID of the survey
 *        answers:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              questionId:
 *                type: string
 *                description: The ID of the question
 *              answer:
 *                type: string
 *                description: The answer provided by the user
 */

/**
 * @swagger
 * /response/submit:
 *  post:
 *    summary: Submit responses for a survey
 *    tags:
 *      - Response
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Response'
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              surveyId:
 *                type: string
 *                description: The ID of the survey
 *              answers:
 *                type: string
 *                description: JSON string containing an array of answers
 *                example: '[{"questionId": "66d95bbd12f3eecb2e4b6940", "answer": "بد"}]'
 *    responses:
 *      200:
 *        description: Response submitted successfully
 *      400:
 *        description: Invalid input
 */

/**
 * @swagger
 * /response:
 *  get:
 *    summary: Get all responses
 *    tags:
 *      - Response
 *    responses:
 *      200:
 *        description: List of responses
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Response'
 */
