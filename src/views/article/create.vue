<template>
  <article-detail :isEdit='false'></article-detail>
</template>

<script>
import ArticleDetail from './components/ArticleDetail'

export default {
  name: 'createArticle',
  components: { ArticleDetail }
}
</script>

