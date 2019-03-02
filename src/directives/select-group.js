/**
 * Created By shli on 2018/10/18
 */
export default {
  bind (el, binding) {
    const addTopStyle = (index, nodes, scrollTop, scrollbarWidth) => {
      nodes[index].style.paddingTop = '30px'
      nodes[index].children[0].style.backgroundColor = '#fff'
      nodes[index].children[0].style.cursor = 'pointer'
      nodes[index].children[0].style.zIndex = 10
      nodes[index].children[0].style.width = scrollbarWidth + 'px'
      nodes[index].children[0].style.position = 'absolute'
      nodes[index].children[0].style.top = scrollTop - 8 + 'px'
      nodes[index].children[0].style.boxShadow = '-4px 3px 4px 0px #ccc'
    }

    const removeTopStyle = (nodes) => {
      Array.from(nodes).map((node) => {
        node.style.paddingTop = 'unset'
        node.children[0].style.backgroundColor = 'unset'
        node.children[0].style.width = 'unset'
        node.children[0].style.position = 'unset'
        node.children[0].style.boxShadow = 'unset'
      })
    }

    /**
     * 递归算法 计算 单元格长度 递归数组
     * @param index
     * @param cellHeightList 每个单元格的高度列表
     **/
    const factorial = (index, cellHeightList) => {
      if (index <= 0) {
        return cellHeightList[0]
      } else {
        return cellHeightList[index] + factorial(index - 1, cellHeightList)
      }
    }

    /**
     * 获取 当前滚动到的单元格的 index
     * @param scroll 当前滚动高度
     * @param cellHeightList 每个单元格的高度列表
     */
    const getWhichCell = (scroll, cellHeightList) => {
      const cellHeightListSumList = []
      for (let n = 0; n < cellHeightList.length; n++) {
        cellHeightListSumList.push(factorial(n, cellHeightList))
      }
      for (let n = 0; n < cellHeightListSumList.length; n++) {
        if (n === 0) {
          if (scroll > 0 && scroll <= cellHeightListSumList[0]) {
            return {
              index: 0,
              min: 0,
              max: cellHeightListSumList[0]
            }
          }
        } else if (n === cellHeightListSumList.length - 1) {
          if (scroll > cellHeightListSumList[n - 1]) {
            return {
              index: n,
              min: cellHeightListSumList[n - 1],
              max: cellHeightListSumList[n]
            }
          }
        } else {
          if (scroll > cellHeightListSumList[n - 1] && scroll <= cellHeightListSumList[n]) {
            return {
              index: n,
              min: cellHeightListSumList[n - 1],
              max: cellHeightListSumList[n]
            }
          }
        }
      }
    }

    const selectDown = el.querySelector('.el-scrollbar__wrap')

    selectDown.addEventListener('scroll', (e) => {
      const scrollbarWidth = el.querySelector('.el-scrollbar').clientWidth
      const scrollbarViewHeight = el.querySelector('.el-scrollbar__view').offsetHeight
      const scrollTop = e.srcElement.scrollTop
      const childrenNodes = e.srcElement.children[0].children
      const childrenNodeHeightList = Array.from(childrenNodes).map(node => node.clientHeight)

      if (scrollTop < scrollbarViewHeight && scrollTop > 0) {
        const { index, min, max } = getWhichCell(scrollTop, childrenNodeHeightList)
        if (scrollTop > 0 && scrollTop > min && scrollTop < max - 40) {
          removeTopStyle(childrenNodes)
          index ? addTopStyle(index, childrenNodes, scrollTop - factorial(index - 1, childrenNodeHeightList), scrollbarWidth)
            : addTopStyle(index, childrenNodes, scrollTop, scrollbarWidth)
        }
      } else {
        removeTopStyle(childrenNodes)
      }

      /* 点击跳转到第一行 */
      Array.from(childrenNodes).map((node, index) => {
        node.children[0].addEventListener('click', () => {
          e.srcElement.scrollTop = index ? factorial(index - 1, childrenNodeHeightList) : 0
          removeTopStyle(childrenNodes)
        }, false)
      })
    })
  }
}
