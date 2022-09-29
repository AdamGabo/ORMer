const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({include: {model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}})
    .then(dataBase => {
      if(!dataBase) {
        res.status(404).json({message: 'Cannot find categories, Please Try Again'});
        return;
      }
      res.json(dataBase);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({where: {id: req.params.id},include: {model: Product,attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}})
    .then(dataBase => {
      if(!dataBase) {
        res.status(404).json({message: 'Cannot find categories by id, Please Try Again'});
        return;
      }
      res.json(dataBase);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({category_name: req.body.category_name})
    .then(dataBase => res.json(dataBase))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {where: {id: req.params.id}})
    .then(dataBase => {
      if (!dataBase) {
        res.status(404).json({message:'Cannot find category with specified id'});
        return;
      }
      res.json(dataBase);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({where: {id: req.params.id}})
  .then(dataBase => {
      if (!dataBase){res.status(404).json({message: 'Cannot delete category with this id not found'});
        return;
      }
      res.json(dataBase);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
