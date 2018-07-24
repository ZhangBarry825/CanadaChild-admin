<template>
  <article-detail :isEdit='true'></article-detail>
</template>

<script>
import ArticleDetail from './components/ArticleDetail'

export default {
  name: 'editArticle',
  components: { ArticleDetail }
}
</script>

