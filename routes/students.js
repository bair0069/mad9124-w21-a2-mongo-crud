// IMPORTS
import createDebug from 'debug'
import sanitizeBody from '../middleware/sanitizeBody.js'
import Student from '../models/Student.js'
import express from 'express'

const debug = createDebug('assignment2:routes:students')
const router = express.Router()

//GET
router.get('/', async (req, res) => {
  const collection = await Student.find()
  res.send({ data: formatResponseData(collection) })
})
//POST
router.post('/', sanitizeBody, async (req, res) => {
  let newDocument = new Student(req.sanitizedBody)
  try {
    await newDocument.save()
    res.status(201).json({ data: newDocument })
  } catch (err) {
    debug(err)
    res.status(500).send({
      errors: [
        {
          status: '500',
          title: 'Server error',
          description: 'Problem saving document to the database.',
        },
      ],
    })
  }
})
//GET ID
router.get('/:id', async (req, res) => {
  try {
    const document = await Student.findById(req.params.id)
    if (!document) throw new Error('Resource not found')
    res.json({ data: formatResponseData(document) })
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})
//UPDATE
const update =
  (overwrite = false) =>
  async (req, res) => {
    try {
      const document = await Student.findByIdAndUpdate(
        req.params.id,
        req.sanitizedBody,
        {
          new: true,
          overwrite,
          runValidators: true,
        }
      )
      if (!document) throw new Error('Resource not found')
      res.send({ data: formatResponseData(document) })
    } catch (err) {
      sendResourceNotFound(req, res)
    }
  }
//PUT
router.put('/:id', sanitizeBody, update(true))
//PATCH
router.patch('/:id', sanitizeBody, update(false))
//DELETE
router.delete('/:id', async (req, res) => {
  try {
    const document = await Student.findByIdAndRemove(req.params.id)
    if (!document) throw new Error('Resource not found')
    res.send({ data: formatResponseData(document) })
  } catch (err) {
    sendResourceNotFound(req, res)
  }
})
// SUPPORT FUNCTIONS
/**
 * Format the response data object according to JSON:API v1.0
 * @param {string} type The resource collection name, e.g. 'cars'
 * @param {Object | Object[]} payload An array or instance object from that collection
 * @returns
 */
function formatResponseData(payload, type = 'students') {
  if (payload instanceof Array) {
    return payload.map((resource) => format(resource))
  } else {
    return format(payload)
  }

  function format(resource) {
    const { _id, ...attributes } = resource.toObject()
    return { type, id: _id, attributes }
  }
}

function sendResourceNotFound(req, res) {
  res.status(404).send({
    error: [
      {
        status: '404',
        title: 'Resource does nto exist',
        description: `We could not find a person with id: ${req.params.id}`,
      },
    ],
  })
}

export default router