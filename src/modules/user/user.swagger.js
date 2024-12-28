/**
 * @swagger
 * tags:
 *  name: User
 *  description: User module and Routes
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateUserProfile:
 *              type: object
 *              required:
 *                  -   fullName
 *                  -   personnelCode
 *                  -   workLocation
 *              properties:
 *                  fullName:
 *                      type: string
 *                  personnelCode:
 *                      type: string
 *                  workLocation:
 *                      type: string
 */

/**
 * @swagger
 * /user/whoami:
 *  get:
 *      summary: get user-profile 
 *      tags:
 *          -   User
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /user/profile:
 *  put:
 *      summary: Update user profile (first time only)
 *      tags:
 *          - User
 *      security:
 *          - CookieAuth: []
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUserProfile'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUserProfile'
 *      responses:
 *          200:
 *              description: Profile updated successfully
 *          403:
 *              description: Forbidden (User profile already completed)
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          404:
 *              description: User not found
 */

/**
 * @swagger
 * /user/users:
 *  get:
 *      summary: Get all users (Admin only)
 *      tags:
 *          - User
 *      security:
 *          - CookieAuth: []
 *      responses:
 *          200:
 *              description: List of all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                  fullName:
 *                                      type: string
 *                                  mobile:
 *                                      type: string
 *                                  personnelCode:
 *                                      type: string
 *                                  workLocation:
 *                                      type: string
 *                                  role:
 *                                      type: string
 *          403:
 *              description: Access denied. Admins only.
 *          401:
 *              description: Unauthorized
 */

/**
 * @swagger
 * /user/users/{id}:
 *  get:
 *      summary: Get user by ID (Admin only)
 *      tags:
 *          - User
 *      security:
 *          - CookieAuth: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *            description: User ID
 *      responses:
 *          200:
 *              description: User details
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                              fullName:
 *                                  type: string
 *                              mobile:
 *                                  type: string
 *                              personnelCode:
 *                                  type: string
 *                              workLocation:
 *                                  type: string
 *                              role:
 *                                  type: string
 *          403:
 *              description: Access denied. Admins only.
 *          401:
 *              description: Unauthorized
 *          404:
 *              description: User not found
 */

/**
 * @swagger
 * /user/users/{id}:
 *  put:
 *      summary: Update user profile by admin
 *      tags:
 *          - User
 *      security:
 *          - CookieAuth: []
 *      parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            schema:
 *              type: string
 *            description: User ID
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUserProfile'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUserProfile'
 *      responses:
 *          200:
 *              description: Profile updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Profile updated successfully"
 *                              user:
 *                                  type: object
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                      fullName:
 *                                          type: string
 *                                      mobile:
 *                                          type: string
 *                                      personnelCode:
 *                                          type: string
 *                                      workLocation:
 *                                          type: string
 *                                      role:
 *                                          type: string
 *          403:
 *              description: Access denied. Admins only.
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          404:
 *              description: User not found
 */
