<template>
  <div class="ql-container">
    <div ref="editor" />
  </div>
</template>

<script>
let Quill
if (process.browser) {
  Quill = require('quill')
  require('quill/dist/quill.core.css')
  require('quill/dist/quill.snow.css')
}
export default {
  name: 'QuillEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      quill: null,
      content: ''
    }
  },
  mounted() {
    // 읽기 전용일 때
    let options = {}

    if (this.readonly) options.readOnly = true
    else {
      options = {
        theme: 'snow',
        modules: {
          toolbar: [
            // [{ header: [1, 2, false] }],
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            ['blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            // [{ indent: '-1' }, { indent: '+1' }],
            // ['clean'],
            ['link', 'image', 'video']
          ]
        }
      }
    }

    this.renderEditor(options)

    if (!this.readonly) this.addEventListeners()
    else this.removeEditorPadding()
  },
  methods: {
    renderEditor(options) {
      this.quill = new Quill(this.$refs.editor, options)
      this.quill.pasteHTML(this.value)
    },
    removeEditorPadding() {
      if (!this.quill) return

      let $editor = document.getElementsByClassName('ql-editor')
      if (!$editor.length) return
      $editor = $editor[0]
      $editor.style.padding = 0
    },
    addEventListeners() {
      this.quill.on('text-change', (delta, oldDelta, source) => {
        let html = this.$refs.editor.children[0].innerHTML
        const text = this.quill.getText()
        if (html === '<p><br></p>') html = ''
        this.content = html
        this.$emit('input', this.content)
        this.$emit('change', { html, text, quill: this.quill })
      })

      const toolbar = this.quill.getModule('toolbar')
      toolbar.addHandler('image', this.imageHandler)
      this.quill.focus()
    },
    async imageHandler() {
      const uploadImage = file => {
        this.$store
          .dispatch('action/UPLOAD_IMAGE', file)
          .then(data => insert(data))
          .catch(err =>
            this.notifyError(
              '서버에 이미지를 업로드하지 못했습니다. 나중에 다시 시도해주세요.'
            )
          )
      }

      const insert = url => {
        const value = url.location
        const range = this.quill.getSelection()
        this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER)
      }

      const open = () => {
        const input = document.createElement('input')
        input.accept = 'image/*'
        input.setAttribute('type', 'file')
        input.click()

        input.onchange = () => {
          const file = input.files[0]

          if (/^image\//.test(file.type)) uploadImage(file)
          else this.notifyError('이미지 형식의 파일만 올려주세요.')
        }
      }

      open()
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/color.scss';

.ql-container .ql-snow {
  transition: border-color 0.3s;
  border: 1px solid #d9d9d9;
  background-color: white;
}
.ql-toolbar {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.ql-container {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.ql-tooltip .ql-editing {
  left: 0px !important;
}
.ql-editor {
  color: black;
  line-height: 1.8;
  font-size: 1rem;
  min-height: 20vh;

  img {
    width: 100% !important;
    max-width: 100% !important;
  }
}
</style>