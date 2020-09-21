import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(bodyParser());

app.get(
  '/products',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await prisma.product.findMany({
        include: {
          reviews: true,
          categories: true
        }
      });

      res.json(products);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

app.get(
  '/products/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await prisma.product.findOne({
        where: {
          id
        }
      });

      res.json(product);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

app.post(
  '/products',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
      const product = await prisma.product.create({ data });
      res.json(product);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

app.patch(
  '/products/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data = req.body;

      const product = await prisma.product.update({
        where: { id },
        data
      });

      res.json(product);
    } catch (err) {
      res.json(err);
    }
  }
);

app.delete(
  '/products/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const product = await prisma.product.delete({
        where: { id }
      });

      res.json(product);
    } catch (err) {
      res.json(err);
    }
  }
);

app.get(
  '/categories',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await prisma.category.findMany({
        include: {
          products: {
            select: {
              id: true,
              name: true,
              price: true
            }
          }
        }
      });
      res.json(categories);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

app.post(
  '/categories',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
      const category = await prisma.category.create({
        data
      });
      res.json(category);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

app.patch(
  '/products/:id/categories',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { categoryId } = req.body;
      const product = await prisma.product.update({
        where: { id },
        data: {
          categories: {
            connect: {
              id: categoryId
            }
          }
        }
      });
      res.json(product);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

app.get(
  '/reviews',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const reviews = await prisma.review.findMany();
      res.json(reviews);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

app.post(
  '/reviews',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
      const review = await prisma.review.create({
        data: {
          title: data.title,
          body: data.body,
          product: {
            connect: {
              id: data.productId
            }
          }
        }
      });
      res.json(review);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

app.patch(
  '/products/:id/carts',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      res.json(null);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

const port = 3001;

app.listen(port);
console.log(`Server listening on http://localhost:${port}`);
